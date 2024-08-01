import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@chakra-ui/react';
import { uploadCandidateResume } from '../../services/userService'
export const DragAndDropUpload = ({ uploadResume }) => {
    const toast = useToast();

    // Function to handle file drops
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0]; // Taking the first file if multiple files were dropped

        if (!file) {
            toast({
                title: "No file selected.",
                description: "Please select a file to upload.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);
        debugger
        const resume = formData.get('resume')

        try {
            await uploadCandidateResume({ resume });
            toast({
                title: "Resume uploaded.",
                description: "Your resume has been uploaded successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error uploading resume.",
                description: error.message || "Failed to upload resume.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [uploadResume, toast]);

    // Setup the dropzone hook
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={{ padding: '20px', border: '2px dashed #ccc', cursor: 'pointer', textAlign: 'center' }}>
            <input {...getInputProps()} accept=".pdf,.doc,.docx" />
            {
                isDragActive ?
                    <p>Drop the file here ...</p> :
                    <p>Drag 'n' drop a resume file here, or click to select file</p>
            }
        </div>
    );
};
