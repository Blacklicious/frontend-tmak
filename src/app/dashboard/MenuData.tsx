
import { Menu } from 'antd';
import MenuDataNewsletter from './MenuDataNewsletter';
import MenuDataLeadList from './MenuDataLeadList';

const MenuSetting = () => {

  return (
    <div>
      <div className='p-5'>
        <MenuDataLeadList />
      </div>
      <div className='p-5'>
        <MenuDataNewsletter />
      </div>
    </div>
  );
}

export default MenuSetting;