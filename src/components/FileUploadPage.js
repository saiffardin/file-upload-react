/* eslint-disable no-unused-vars */
import React, {useState} from 'react';

const FileUploadPage = () => {
    const API_KEY = '6d207e02198a847aa98d0a2a901485a5';
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    // 'selectedFile' contains information on the currently picked file.
    // 'isFilePicked' determines if a file has been picked or not.

    const changeHandler = (event) => {
        console.log('changeHandler');
        // console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }



    const handleSubmission = () => {
        console.log('handleSubmission');
        const formData = new FormData();

        // console.log(selectedFile.name);
        formData.append('file', selectedFile);
        console.log(formData);

        sendToServer(formData)
    }

    const sendToServer = (formData) => {

        for (let obj of formData) {
            console.log(obj);
        }
        fetch(
            `https://exam.greeho.com/api/files`,
            {
                method: 'POST',
                headers: {
                    "Content-type": "multipart/form-data",
                    // "Content-type": "form-data",

                    "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2NTYsImlhdCI6MTY0NDIyMDExMywiZXhwIjoxNjQ0MjIwNDEzfQ.KhGim50BcF_ywxldv0fBAs7eYVkvDAOaLqAOebKxAjw",

                    "x-api-key": 'N9hH7M65SqpFl26gdJ8DKPo32ppr85kFAfkb8u8x39NOD729hd20PoE1Wccx0O16'
                },
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result.message);
                console.log(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='m-2 p-1' style={{border: '2px solid green'}}>
            <input type="file" name="file" onChange={changeHandler} />

            {isFilePicked ? (
                <div className='my-2' style={{border: '1px solid blue'}}>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}

            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>

            {/* <div>
                <button onClick={printSelectedFile}>printSelectedFile</button>
            </div> */}
        </div>
    );
};

export default FileUploadPage;