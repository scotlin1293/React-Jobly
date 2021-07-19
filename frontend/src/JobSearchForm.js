import { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import './JobSearchForm.css';

const JobSearchForm = ({ getJobs }) => {
  const intialState = {
    searchTerm: '',
  };
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(intialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    await getJobs(formData.searchTerm);
    setIsLoading(false);
    setFormData(intialState);
  };
  return (
    <Form className='search-form mt-4' onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-10'>
          <FormGroup>
            <Input
              id='searchTerm'
              name='searchTerm'
              placeholder='Enter Search Term...'
              value={formData.searchTerm}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <Button disabled={isLoading} className='col-2' color='primary'>
          Search
        </Button>
      </div>
    </Form>
  );
};

export default JobSearchForm;
