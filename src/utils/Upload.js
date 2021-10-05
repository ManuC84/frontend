import React, { useRef, useState } from 'react';
import S3 from 'react-aws-s3';
import Dialog from '@material-ui/core/Dialog';
import { Button, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { API } from '../api';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

const Upload = ({ openModal, handleCloseModal, user, setOpenModal }) => {
  const [uploadError, setUploadError] = useState(false);
  const fileInput = useRef();
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name;
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      s3Url: 'https://freely-comment-profile-photos.s3.amazonaws.com',
    };

    const postData = async (fileUrl) => {
      try {
        await API.post('users/uploadFile', {
          file: fileUrl,
          userId: user.data.result._id,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const updateProfile = (updatedData) => {
      const profile = JSON.parse(localStorage.getItem('profile'));
      profile.data.result.imageUrl = updatedData;
      localStorage.setItem('profile', JSON.stringify(profile));
    };

    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName)
      .then((data) => {
        console.log(data);
        if (data.status === 204) {
          setUploadError(false);
          console.log('success!');
          postData(data.location);
          updateProfile(data.location);
          setOpenModal(false);
          history.push('/');
        } else {
          console.log('fail');
          setUploadError(true);
        }
      })
      .catch((err) => setUploadError(true));
  };
  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CloseIcon
        style={{ marginLeft: 'auto', padding: 5, cursor: 'pointer' }}
        onClick={() => {
          handleCloseModal();
          setUploadError(false);
        }}
      />
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 20px 20px 20px',
        }}
        onSubmit={handleClick}
      >
        <h3>Upload file</h3>
        <input type="file" ref={fileInput} />

        <br />
        <Button
          style={{ marginTop: 10 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Upload
        </Button>
        {uploadError && (
          <Alert severity="error">
            There was an error, please try again later
          </Alert>
        )}
      </form>
    </Dialog>
  );
};

export default Upload;
