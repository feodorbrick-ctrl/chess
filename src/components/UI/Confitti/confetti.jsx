import { useMemo } from "react";
import "./confetti.css";

const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#F473B9", "#FFA500"];

export default function Confetti({ count = 100, active = true }) {
    const pieces = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: Math.random() * 100,          // %
                delay: Math.random() * 3,           // сек
                duration: 3 + Math.random() * 3,    // сек
                size: 6 + Math.random() * 8,        // px
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                rotate: Math.random() * 360,
                drift: (Math.random() - 0.5) * 200, // px горизонтальный снос
                round: Math.random() > 0.5,
            })),
        [count]
    );

    if (!active) return null;

    return (
        <div className="confetti-container" aria-hidden="true">
            {pieces.map((p) => (
                <span
                    key={p.id}
                    className="confetti-piece"
                    style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size * (p.round ? 1 : 0.5),
                        background: p.color,
                        borderRadius: p.round ? "50%" : "2px",
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        "--drift": `${p.drift}px`,
                        "--rotate": `${p.rotate}deg`,
                    }}
                />
            ))}
        </div>
    );
}