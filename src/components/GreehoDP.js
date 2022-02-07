
import React, {useRef, useState} from 'react';
import {Button, Card} from 'react-bootstrap';
import myImg from '../../src/images/default.png';


const GreehoDP = () => {

    const [uploadedFileName, setUploadedFileName] = useState(null);

    const inputRef = useRef(null);

    const handleUploadBtn = () => {
        inputRef.current?.click();
    };

    const uploadToServer = (e) => {

        console.log(e.target.files[0]);

        // console.log(inputRef.current.files[0]);
        // inputRef.current?.files && setUploadedFileName(inputRef.current.files[0]);

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        const url = `https://exam.greeho.com/api/files`;
        const reqHeaders = {
            method: 'POST',
            headers: {
                // "Content-Type": "multipart/form-data",
                // "Content-type": "form-data",

                "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2NTYsImlhdCI6MTY0NDI2ODAzOCwiZXhwIjoxNjQ0MjY4MzM4fQ.9FXi12Mn9DC1I7vOn73Ved81NLxd1cfa-_SHbD2w2DQ",

                "x-api-key": 'N9hH7M65SqpFl26gdJ8DKPo32ppr85kFAfkb8u8x39NOD729hd20PoE1Wccx0O16'
            },
            body: formData
        }

        fetch(url, reqHeaders)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.message);
                console.log(result);
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div style={{border: '1px solid red'}} className='text-center '>
            <Card.Img variant="top" src={myImg} style={{width: '18rem'}} className='' />

            <div className='d-flex justify-content-around p-1 mb-1'>
                <div>
                    <input
                        className='d-none'
                        ref={inputRef}
                        type="file"
                        onChange={uploadToServer}
                    />

                    <Button variant="secondary" className="m-1" name="uploadBtn" onClick={handleUploadBtn}>
                        Update Picture
                    </Button>
                </div>
                <Button variant="danger" className='m-1' onClick={handleUploadBtn}>Delete Picture</Button>
            </div>
        </div>
    );
};

export default GreehoDP;