import "./headerDashboard.less";

type HeaderDashbordProp = {
  title: string;
};

const HeaderDashbord = ({ title }: HeaderDashbordProp) => {
  return (
    <div className='header-dashboard'>
      <h2>{title}</h2>
    </div>
  );
};

export default HeaderDashbord;
