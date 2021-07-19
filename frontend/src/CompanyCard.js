import { Card, CardTitle, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

const DEFAULT_LOGO_URL = '/logos/logo4.png';

const CompanyCard = ({ handle, name, description, logo }) => {
  return (
    <Link className='card-link' to={`/companies/${handle}`}>
      <Card className='company-card mb-2'>
        <CardBody>
          <div className='text-content'>
            <CardTitle tag='h6'>{name}</CardTitle>
            <CardText>{description}</CardText>
          </div>
          <img src={logo ? logo : DEFAULT_LOGO_URL} alt={`Logo for ${name}`} />
        </CardBody>
      </Card>
    </Link>
  );
};

export default CompanyCard;
