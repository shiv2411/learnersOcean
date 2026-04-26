import { useState } from "react"

const ProductImage = ({ src, alt,onImageLoad }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            style={{
                width: "100%",
                height: "180px",
                background: "#e5e5e5",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {!loaded && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
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
                    onImageLoad();
                }}
                style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                }}
            />
        </div>
    );

}

export default ProductImage;