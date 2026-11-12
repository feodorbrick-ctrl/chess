export class WebRTC {
    constructor(isConnected) {
        this.peer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        });
        this.setIsConnected = isConnected;
        this.channel = null;

        this.peer.ondatachannel = event => {
            this.channel = event.channel;
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
        this.channel.onopen = () => {
            this.setIsConnected(true);
            console.log('Connected!');
        };

        this.channel.onclose = () => {
            this.setIsConnected(false);
            console.log('Disconnected!');
        };

        this.channel.onmessage = event => {
            console.log('Received:', event.data);
        };
    }

    async createRoom() {
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
            this.channel.send(message);
        }
    }

    close() {
        this.channel?.close();
        this.peer.close();
    }
}