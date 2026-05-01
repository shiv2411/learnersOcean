import { useState } from "react"

const ProductImage = ({ src, alt,onImageLoad }) => {
    const [loaded, setLoaded] = useState(false);

    return (
    <div
        style={{
            width: "100%",
            aspectRatio: "1/1", /* Replaces hardcoded 180px for responsive sizing */
            background: "#e5e5e5",
            position: "relative",
        }}
    >
        {/* Placeholder UI */}
        {!loaded && (
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666" // Subtle text color
                }}
            >
                Loading image...
            </div>
        )}

        <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => {
                setLoaded(true);
                if (onImageLoad) onImageLoad(); // Added safety check
            }}
            onError = {() => {
                setLoaded(false);
                if(onImageLoad) onImageLoad();
            }}
            style={{
                width: "100%",
                height: "100%", /* Fills the aspect ratio container */
                objectFit: "cover",
                opacity: loaded ? 1 : 0, /* Hides broken icon before load */
                transition: "opacity 0.3s ease-in-out" /* Smooth fade-in */
            }}
        />
    </div>
);

}

export default ProductImage;