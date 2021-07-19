import { useState } from 'react';
import { Card, CardTitle, CardBody, CardText, Button } from 'reactstrap';
import './JobCard.css';

const JobCard = ({ id, title, salary, equity, applyToJob, user }) => {
  const [hasApplied, setHasApplied] = useState(user.applications.includes(id));

  const handleApply = () => {
    applyToJob(id, user.username);
    setHasApplied(true);
  };

  return (
    <Card className='job-card mb-2'>
      <CardBody>
        <div className='text-content'>
          <CardTitle className='mb-3' tag='h6'>
            {title}
          </CardTitle>
          <CardText className='mb-0'>Salary: {salary}</CardText>
          <CardText>Equity: {equity}</CardText>
        </div>
        <div className='button-container'>
          <Button color='danger' onClick={handleApply} disabled={hasApplied}>
            {hasApplied ? 'APPLIED' : 'APPLY'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobCard;
