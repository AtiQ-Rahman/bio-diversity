import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import styles from "../styles/DropFile.module.css";
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

const uploadImg = require("../assets/images/cloud-upload-regular-240.png")
const fileDefault = require("../assets/images/file-blank-solid-240.png")
const fileCSS = require("../assets/images/file-css-solid-240.png")
const filePdf = require("../assets/images/file-pdf-solid-240.png")
const filePng = require("../assets/images/file-png-solid-240.png")
const fileJpg = require("../assets/images/jpg.png")

export const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    css: fileCSS,
    jpg: fileJpg
}
const DropFileInput = ({ setFieldValue, additionalFiles }) => {

    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFiles = e.target.files;
        for (let file of newFiles) {
            additionalFiles.push(file);
        }
        console.log({ additionalFiles })
        setFieldValue(
            "additionalFiles", additionalFiles
        );
    }

    const fileRemove = (file) => {
        // const updatedList = [...additionalFiles];
        // updatedList.splice(additionalFiles.indexOf(file), 1);
        // setFileList(updatedList);
        // onFileChange(updatedList);
        let list = Array.from(additionalFiles);
        list.splice(additionalFiles.indexOf(file), 1);
        setFieldValue("additionalFiles", list);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <div
                    ref={wrapperRef}
                    className={styles.dropFileInput}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className={styles.dropFileInput__label}>
                        <Image height={40} width={50} src={uploadImg} alt="" ></Image>
                        <p>Drag & Drop your Additional Image here</p>
                    </div>
                    <input type="file" value="" accept=".png, */png, .jpg, */jpg" onChange={onFileDrop} />
                </div>
            </Grid>
            <Grid item xs={12} md={8}>
                {
                    additionalFiles.length > 0 ? (
                        <div>
                            {
                                Array.from(additionalFiles).map((item, index) => (
                                    <div key={index} className={styles.dropFilePreview__item}>
                                        {item.name ? (
                                        <Image height={40} width={50} src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" ></Image>

                                        )
                                    :(
                                        <Image height={40} width={50} src={ImageConfig[item.split('.').pop()] || ImageConfig['default']} alt="" ></Image>
                                    
                                    )}
                                        <div className={styles.dropFilePreview__item__info}>
                                            <p>{item?.name || item}</p>
                                        </div>
                                        <span className={styles.dropFilePreview__item__del} onClick={() => fileRemove(item)}>x</span>
                                    </div>
                                ))
                            }
                        </div>
                    ) :
                        <>
                            
                            <Typography
                                sx={{ p: 5 }}
                                component="h4"
                                variant="h4"> <Icon icon="clarity:image-gallery-solid" width={30} />No Image Selected</Typography>
                        </>

                }
            </Grid>



        </Grid>

    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;