export class WebRTC {
    constructor(setIsConnected, setWhoIsGoing, setCoordinates, setWhatColorAmI) {
        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302'
                },
                {
                    urls: 'turn:YOUR_TURN_SERVER:3478',
                    username: 'YOUR_USERNAME',
                    credential: 'YOUR_PASSWORD'
                }
            ]
        });
        this.setCoordinates = setCoordinates;
        this.setIsConnected = setIsConnected;
        this.setWhoIsGoing = setWhoIsGoing;
        this.setWhatColorAmI = setWhatColorAmI;
        this.channel = null;

        this.peer.ondatachannel = event => {
            this.channel = event.channel;
            this.setWhatColorAmI('black');
            this.setupChannel();
        };

        this.peer.onicecandidate = event => {
            if (!event.candidate) {
                console.log(
                    'Connection data:',
                    this.peer.localDescription
                );
            }
        };
    }

    setupChannel() {
        this.channel.onclose = () => {
            this.setIsConnected(false);
            console.log('Disconnected!');
        };

        this.channel.onmessage = event => {
            const message = JSON.parse(event.data);

            console.log('Received:', message);

            if (message.type === 'move') {
                this.setCoordinates(message.message[0], message.message[1]);
            }
            if (message.type === 'moved') {
                this.setWhoIsGoing(currentTurn => currentTurn === 'black' ? 'white' : 'black');
            }

            if (message.type === 'close') {
                this.setIsConnected(false);
            }
        };

        const onOpen = () => {
            this.setIsConnected(true);
            console.log('Connected!');
        };
        if (this.channel.readyState === 'open') {
            onOpen();
        } else {
            this.channel.onopen = onOpen;
        }
    }

    async createRoom() {
        this.setWhatColorAmI('white');
        this.channel = this.peer.createDataChannel('game');

        this.setupChannel();

        const offer = await this.peer.createOffer();
        console.log(offer)

        await this.peer.setLocalDescription(offer);
    }

    async joinRoom(offer) {
        await this.peer.setRemoteDescription(offer);

        const answer = await this.peer.createAnswer();

        await this.peer.setLocalDescription(answer);

        return this.peer.localDescription;
    }

    async connect(answer) {
        await this.peer.setRemoteDescription(answer);
    }

    async addCandidate(candidate) {
        await this.peer.addIceCandidate(candidate);
    }

    sendMessage(message) {
        if (this.channel?.readyState === 'open') {
            this.channel.send(JSON.stringify(message));
        }
    }

    close() {
        this.setIsConnected(false);
        this.sendMessage({type: 'close'});
        this.channel?.close();
        this.peer.close();
        this.channel = null;
    }
}
