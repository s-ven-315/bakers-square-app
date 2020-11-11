import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";


export function ImgDialog(props) {
    const { loggedIn, title, user, open, setOpen, previewImg, setPreviewImg, imageFile, setImageFile } = props;
    const handleSelect = (e) => {
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(imageFile)
        let formData = new FormData();
        formData.append('image', imageFile);
        console.log(formData)
        // axios({
        //     method: 'POST',
        //     url: `http://localhost:5000/api/users/${user.userId}/image`, formData,
        //     headers: {
        //         Authorization: "Bearer " + loggedIn.access_token
        //     }
        // })
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.error(error.response)
        //     })
        // setPreviewImg(null)
        // setOpen(false)
    }
    return (
        <Dialog open={open} onBackdropClick={() => setOpen(false)} fullWidth maxWidth='sm' style={{
            height: '100%'
        }}>
            <DialogTitle>{title}</DialogTitle>
            <Divider />
            {previewImg ?
                <div className="img-preview-container">
                    <img className="img-preview"
                        src={previewImg}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Upload</Button>
                    <Button variant="contained" component="label" color="primary">
                        {previewImg ? <span>Select Another Image</span> : <span>Select An Image</span>}
                        <input type="file" style={{ display: "none" }} onChange={handleSelect} />
                    </Button>
                </div>
                :
                <Button variant="contained" component="label" color="primary">
                    {previewImg ? <span>Select Another Image</span> : <span>Select An Image</span>}
                    <input type="file" style={{ display: "none" }} onChange={handleSelect} />
                </Button>
            }

        </Dialog >
    );
}