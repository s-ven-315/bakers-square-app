import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { DataContext } from "../../contexts/Context";
import { EditImage } from "../../helpers";

export function EditImgDialog(props) {
    console.log(`EditImgDialog() is rendered.`)
    const context = useContext(DataContext)
    const { title, open, setOpen, previewImg, setPreviewImg, imageFile, setImageFile, isProfile } = props;
    const handleSelect = (e) => {
        setPreviewImg(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('image', imageFile);
        EditImage(context, formData, setOpen, setPreviewImg, isProfile)
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