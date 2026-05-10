import React, { useRef, useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CustomMandala = () => {

    const canvasRef = useRef(null);
    const { addToCart } = useContext(ShopContext);

    const [colors, setColors] = useState([
        "#1e3a8a",
        "#9333ea",
        "#ec4899",
        "#f59e0b"
    ]);

    const [symmetry, setSymmetry] = useState(16);
    const [layers, setLayers] = useState(8);
    const [patternType, setPatternType] = useState("flower");

    const [size, setSize] = useState("A4");
    const sizes = ["A2", "A3", "A4"];

    const [generatedImage, setGeneratedImage] = useState("");
    const [loading, setLoading] = useState(false);

    // 📐 CANVAS SIZE
    const getCanvasSize = () => {
        switch (size) {
            case "A2": return 600;
            case "A3": return 500;
            case "A4": return 400;
            default: return 400;
        }
    };

    // 🎨 DRAW
    const drawMandala = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const baseRadius = 25;

        for (let l = 0; l < layers; l++) {
            const radius = baseRadius + l * 18;

            ctx.strokeStyle = colors[l % colors.length];
            ctx.lineWidth = 1.2;

            for (let i = 0; i < symmetry; i++) {
                const angle = (Math.PI * 2 * i) / symmetry;

                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);

                if (patternType === "flower") {
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.bezierCurveTo(
                        radius * 0.3, -radius * 0.6,
                        radius * 0.7, -radius * 0.6,
                        radius, 0
                    );
                    ctx.bezierCurveTo(
                        radius * 0.7, radius * 0.6,
                        radius * 0.3, radius * 0.6,
                        0, 0
                    );
                    ctx.stroke();
                }

                if (patternType === "spokes") {
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(radius, 0);
                    ctx.stroke();
                }

                if (patternType === "waves") {
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, Math.PI / symmetry);
                    ctx.stroke();
                }

                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.stroke();

            for (let i = 0; i < symmetry; i++) {
                const angle = (Math.PI * 2 * i) / symmetry;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;

                ctx.beginPath();
                ctx.fillStyle = colors[(l + 1) % colors.length];
                ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.beginPath();
        ctx.fillStyle = colors[0];
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
    };

    // 🔥 GENERATE (COMPRESSED)
    const generateMandala = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const dimension = getCanvasSize();
        canvas.width = dimension;
        canvas.height = dimension;

        drawMandala(ctx, dimension, dimension);

        // 🔥 COMPRESS IMAGE (IMPORTANT FIX)
        const image = canvas.toDataURL("image/jpeg", 0.6);
        setGeneratedImage(image);
    };

    useEffect(() => {
        generateMandala();
    }, [colors, symmetry, layers, patternType, size]);

    // ☁️ UPLOAD TO CLOUDINARY
    const uploadToCloudinary = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/upload/mandala`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ image: generatedImage }),
                }
            );

            const data = await res.json();

            if (data.success) return data.url;

        } catch (err) {
            console.log(err);
        }
    };

    // 🛒 HANDLE ADD TO CART
    const handleAddToCart = async () => {
        setLoading(true);

        const imageUrl = await uploadToCloudinary();

        setLoading(false);

        if (!imageUrl) {
            alert("Upload failed");
            return;
        }

       addToCart("custom_" + Date.now(), {
    custom: true,
    name: "Custom Mandala",
    size,
    image: imageUrl,
    quantity: 1,
    price:
        size === "A2"
            ? 500
            : size === "A3"
                ? 400
                : 300
});
    };

  return (

<div className="relative min-h-screen overflow-hidden bg-[#050816] text-white py-14">

    {/* BACKGROUND GLOWS */}
    <div className="absolute top-0 left-0 w-[450px] h-[450px]
    bg-blue-500/20 blur-[140px] rounded-full"></div>

    <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
    bg-purple-500/20 blur-[140px] rounded-full"></div>

    {/* MANDALA BG */}
    <div
        className='absolute inset-0 opacity-[0.04] bg-center bg-repeat'
        style={{
            backgroundImage: `url(${generatedImage || ""})`,
            backgroundSize: '400px'
        }}
    ></div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* HEADER */}
        <div className="text-center mb-14">

            <h1 className="text-4xl sm:text-5xl font-bold
            bg-gradient-to-r from-blue-200 via-white to-purple-200
            bg-clip-text text-transparent">

                Mandala Creation Studio

            </h1>

            <p className="mt-5 text-blue-100/70
            max-w-2xl mx-auto leading-relaxed">

                Craft your own mesmerizing mandala with colors,
                symmetry, and sacred patterns 

            </p>

        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-start">

            {/* CONTROLS PANEL */}
            <div className="relative">

                <div className="absolute inset-0
                bg-white/5 blur-3xl rounded-[36px]"></div>

                <div className="relative
                bg-white/5 backdrop-blur-2xl
                border border-white/10
                rounded-[32px]
                p-7 space-y-8
                shadow-[0_0_35px_rgba(59,130,246,0.12)]">

                    {/* COLORS */}
                    <div>

                        <p className="text-blue-200 mb-4 text-sm tracking-wider uppercase">
                            Color Palette
                        </p>

                        <div className="flex gap-4 flex-wrap">

                            {colors.map((c, i) => (

                                <div
                                    key={i}
                                    className="group relative"
                                >

                                    <div
                                        className="absolute inset-0 rounded-full
                                        blur-xl opacity-70 group-hover:opacity-100"
                                        style={{ backgroundColor: c }}
                                    ></div>

                                    <input
                                        type="color"
                                        value={c}
                                        onChange={(e) => {
                                            const newColors = [...colors];
                                            newColors[i] = e.target.value;
                                            setColors(newColors);
                                        }}
                                        className="relative w-14 h-14 rounded-full
                                        cursor-pointer border-4 border-white/20
                                        overflow-hidden bg-transparent"
                                    />

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* SYMMETRY */}
                    <div>

                        <div className="flex justify-between mb-2">
                            <p className="text-blue-200 text-sm uppercase tracking-wide">
                                Symmetry
                            </p>

                            <span className="text-white font-semibold">
                                {symmetry}
                            </span>
                        </div>

                        <input
                            type="range"
                            min={6}
                            max={24}
                            value={symmetry}
                            onChange={(e) => setSymmetry(Number(e.target.value))}
                            className="w-full accent-blue-500"
                        />

                    </div>

                    {/* LAYERS */}
                    <div>

                        <div className="flex justify-between mb-2">
                            <p className="text-blue-200 text-sm uppercase tracking-wide">
                                Layers
                            </p>

                            <span className="text-white font-semibold">
                                {layers}
                            </span>
                        </div>

                        <input
                            type="range"
                            min={4}
                            max={12}
                            value={layers}
                            onChange={(e) => setLayers(Number(e.target.value))}
                            className="w-full accent-purple-500"
                        />

                    </div>

                    {/* PATTERN */}
                    <div>

                        <p className="text-blue-200 mb-3 text-sm uppercase tracking-wide">
                            Pattern Type
                        </p>

                        <select
                            value={patternType}
                            onChange={(e) => setPatternType(e.target.value)}
                            className="w-full
                            bg-[#0f172a]
                            border border-white/10
                            rounded-2xl
                            px-4 py-3
                            text-white outline-none
                            focus:border-blue-400
                            transition"
                        >

                            <option value="flower">Flower</option>
                            <option value="spokes">Spokes</option>
                            <option value="waves">Waves</option>

                        </select>

                    </div>

                    {/* SIZE */}
                    <div>

                        <p className="text-blue-200 mb-4 text-sm uppercase tracking-wide">
                            Frame Size
                        </p>

                        <div className="flex gap-3">

                            {sizes.map((s) => (

                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={`px-5 py-2 rounded-2xl
                                    border transition duration-300

                                    ${size === s
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-300 text-white shadow-lg shadow-blue-500/25"
                                            : "bg-white/5 border-white/10 text-blue-100 hover:border-blue-400"
                                        }`}
                                >

                                    {s}

                                </button>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

            {/* CANVAS SIDE */}
            <div className="flex flex-col items-center">

                {/* CANVAS WRAPPER */}
                <div className="relative group">

                    {/* glow */}
                    <div className="absolute -inset-6
                    bg-gradient-to-r from-blue-500/20 to-purple-500/20
                    blur-3xl rounded-full
                    opacity-70 group-hover:opacity-100
                    transition duration-700"></div>

                    <div className="relative
                    bg-white rounded-[32px]
                    p-5 shadow-2xl">

                        <canvas
                            ref={canvasRef}
                            className="rounded-2xl"
                        />

                    </div>

                </div>

                {/* INFO */}
                <div className="mt-6 text-center">

                    <p className="text-blue-100/70 text-sm">
                        Generated live based on your settings
                    </p>

                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 mt-8 flex-wrap justify-center">

                    <button
                        onClick={generateMandala}
                        className="group relative overflow-hidden
                        px-7 py-3 rounded-2xl
                        bg-white/10 border border-white/10
                        hover:border-blue-400
                        transition duration-300"
                    >

                        <span className="relative">
                            Regenerate ✨
                        </span>

                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="group relative overflow-hidden
                        px-8 py-3 rounded-2xl
                        bg-gradient-to-r from-green-500 to-emerald-600
                        text-white font-medium
                        hover:scale-105 active:scale-95
                        transition duration-300
                        shadow-xl shadow-green-500/25"
                    >

                        <span className="absolute inset-0
                        translate-x-[-120%]
                        group-hover:translate-x-[120%]
                        transition duration-700
                        bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>

                        <span className="relative">
                            {loading ? "Uploading..." : "Add To Cart"}
                        </span>

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

);
};

export default CustomMandala;