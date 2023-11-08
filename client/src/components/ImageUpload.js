import { useState, useRef } from "react";
import styled from "styled-components";
import { CircularProgress } from '@mui/material';
import { FiTrash2 } from "react-icons/fi";

const ImageUpload = ( {images, setImages} ) => {

    const [fileData, setFileData] = useState(); 
    const [selectedImage, setSelectedImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFileData(e.target.files[0]);
        setSelectedImage(e.target.value);
    };

    const handleDelete = (index) => {
        let newArray = [...images]
        newArray.splice(index, 1)
        setImages(newArray)

        // TO DO: also need to delete from Cloudinary. Wait till I set this up in the backend.
    }

    const dragImage = useRef();
    const dragOverImage = useRef();
    
    const dragImageStart = (e, position) => {
        dragImage.current = position;  
    };

    const dragImageEnter = (e, position) => {
        dragOverImage.current = position;  
    };

    const imageDrop = (e) => {
        const copyImages = [...images];
        const dragImageContent = copyImages[dragImage.current];
        copyImages.splice(dragImage.current, 1);
        copyImages.splice(dragOverImage.current, 0, dragImageContent);
        dragImage.current = null;
        dragOverImage.current = null;
        setImages(copyImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            let imageURL; 
            if (
                fileData && (
                    fileData.type === "image/png" ||
                    fileData.type === "image/jpg" ||
                    fileData.type === "image/jpeg"
                )
            ) {
                const image = new FormData(); 
                image.append("file", fileData)
                image.append("cloud_name", "dami8bbi5")
                image.append("upload_preset", "vincentenglish")
                
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dami8bbi5/image/upload",
                    {
                        method: "POST",
                        body: image
                    }
                )
                const imgData = await response.json()
                console.log(imgData)
                imageURL = imgData.url.toString();
                setSelectedImage(""); 
                setIsLoading(false);
                setImages([...images, imageURL])
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    return(
        <Container>
            <hr></hr>
            <p>
                (Optional) Upload up to four images in .png, .jpg or .jpeg format. Images can be removed or reordered via drag and drop.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="abcd">
                    <p>
                        <input
                            className="file"
                            type="file"
                            name="file"
                            value={selectedImage}
                            accept="image/*"
                            onChange={handleFileChange}
                            placeholder="Upload Image"
                            required
                            disabled={images.length === 4}
                        />
                    </p>
                    <p>
                        { isLoading 
                            ? <CircularProgress size={14} />
                            : <button 
                                className="submitBtn"
                                disabled={images.length === 4} 
                                type="submit">
                                Upload Image
                            </button>
                        }
                    </p>  
                </div>
            </form>
            <div className="imagesDiv">
                    {
                        images.length > 0 && 
                            images.map((image, index) => {
                                return(
                                    <div 
                                        className="imageContainer"
                                        key={index}
                                        onDragStart={(e) => dragImageStart(e, index)}
                                        onDragEnter={(e) => dragImageEnter(e, index)}
                                        onDragEnd={imageDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        draggable>
                                        <button 
                                            type="button"
                                            onClick={() => {handleDelete(index)}}
                                            className="trash">
                                            <FiTrash2/>
                                        </button>
                                        <img 
                                            src={image}
                                            alt={`Upload number ${index + 1}`}/>
                                    </div>
                                )
                            })
                    }
            </div>
            <hr></hr>
        </Container>
    )
}

const Container = styled.div`

.abcd {
    display: flex;
    flex-direction: row; 
    align-items: center; 
    flex-wrap: wrap; 
}

.submitBtn {
    margin-top: 0px; 
}

.imagesDiv {
    display: flex;
    flex-direction: row; 
    flex-wrap: wrap; 
}

.imageContainer {
    display: flex; 
    flex-direction: column;
    align-items: center;  
    
    border: solid grey 1px; 
    margin-right: 10px; 
    background-color: pink;
    padding: 0px 10px 10px 10px;   
}

img {
    max-width: 150px; 
    height: 100px; 
    object-fit: cover;
}

.file {
    margin: 0px 5px 0px 0px; 
}

`;

export default ImageUpload; 