import { OperatorNoId } from 'dtos';
import React from 'react';
import { Typography, Avatar } from '@mui/material';
import { FetchStatus } from '../../models';
import { useRouter } from 'next/router';
import { urls } from '../../urls';
import { ImageDropzone } from '../image-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-mui';
import * as yup from 'yup';
import { Titled } from '../titled';
import { FormBox } from '../form-box';
import { SaveAndDelete } from '../save-delete';

interface Props {
  title: string;

  operator: OperatorNoId;
  onSave: (operator: OperatorNoId) => void;
  saveStatus?: FetchStatus;

  onDelete?: () => Promise<void>;
  deleteStatus?: FetchStatus;
}

const validationSchema: yup.SchemaOf<OperatorNoId> = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  phoneNumber: yup.string().required('Phone number is required'),
  description: yup.string().required('Description is required'),
  photo: yup.string().required('Photo is required')
})

export const ManageOperatorForm: React.FC<Props> = ({ title, operator, onSave, saveStatus, onDelete, deleteStatus }) => {
  const router = useRouter();

  const handleDeleteOperator = onDelete && (async () => {
    if (!!onDelete) {
      await onDelete();
      router.push(urls.admin.operators());
    }
  })

  return (
    <Formik
      initialValues={operator}
      validationSchema={validationSchema}
      onSubmit={onSave}
    >
      {({ isValid, values, setValues }) => (
        <FormBox title={title}>
          <Field
            component={TextField}
            name="name"
            label="Operator name"
          />

          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />

          <Field
            component={TextField}
            name="phoneNumber"
            label="Phone number"
          />

          <Field
            component={TextField}
            name="address"
            label="Address"
            multiline
            rows={4}
          />

          <Field
            component={TextField}
            name="description"
            label="Description"
            multiline
            rows={4}
          />

          <ImageDropzone
            multiple={false}
            onReceiveUrls={urls => setValues({ ...values, photo: urls[0] })}
          >
            <Avatar src={values.photo} sx={{ width: 128, height: 128 }} />
          </ImageDropzone>
          <ErrorMessage name="photo" />

          <SaveAndDelete
            isValid={isValid}
            saveStatus={saveStatus}
            onDelete={handleDeleteOperator}
            deleteStatus={deleteStatus}
            deleteModalTitle="Delete operator?"
            deleteModalText="Are you sure you want to delete this operator?"
          />

          {saveStatus === 'error' && <Typography>There was an error saving the operator data</Typography>}
        </FormBox>
      )}
    </Formik>
  )
}
