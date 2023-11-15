import styled from "styled-components";

const ImageDisplay = ( {images} ) => {

    return (
        <ImageDisplayContainer>
            {images.length > 0 && 
                <div className="imageContainer">
                    {   images.map((image, index) => {
                            return (
                                    <img
                                        src={image.url}
                                        alt={`Upload number ${index + 1}`}/>
                            )
                        })
                    }
                </div>
            }
        </ImageDisplayContainer>
    )
};

const ImageDisplayContainer = styled.div`

.imageContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; 
    justify-content: center; 
    align-items: center; 
    margin: 30px 0px 30px 0px;
    gap: 20px 20px; 
}

img {
    height: 200px; 
    max-width: 300px; 
    object-fit: cover; 
}
`

export default ImageDisplay; 