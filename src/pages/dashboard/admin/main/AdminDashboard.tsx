import { Card, Col, Divider, Row } from "antd";
import HeaderDashbord from "../../../../components/header-dashboard/HeaderDashbord";
import useGetAllUser from "../../../../utils/hooks/useGetAllUser";

const AdminDashboard = () => {
  const { user } = useGetAllUser();
  console.log("[ADMIN DASHBOARD] userData : ", user);

  return (
    <>
      <HeaderDashbord title='Dashboard Admin' />
      <div style={{ padding: "8px 20px" }}>
        <Card
          loading={!user}
          title='Data Pengguna'
        >
          <Row gutter={[24, 0]}>
            <Col
              sm={12}
              xl={6}
            >
              <div className='px-6 py-4 bg-white'>
                <h5 className='mb-0 text-3xl'>5</h5>
                <p className='mb-0'>Total Customers</p>
                <Divider className='my-2 mb-0' />
              </div>
            </Col>
            <Col
              sm={12}
              xl={6}
            >
              <div className='px-6 py-4 bg-white'>
                <h5 className='mb-0 text-3xl'>5</h5>
                <p className='mb-0 text-success'>Active Customers</p>
                <Divider className='my-2 mb-0' />
              </div>
            </Col>
            <Col
              sm={12}
              xl={6}
            >
              <div className='px-6 py-4 bg-white'>
                <h5 className='mb-0 text-3xl'>5</h5>
                <p className='mb-0 text-danger'>Inactive Customers</p>
                <Divider className='my-2 mb-0' />
              </div>
            </Col>
            <Col
              sm={12}
              xl={6}
            >
              <div className='px-6 py-4 bg-white'>
                <h5 className='mb-0 text-3xl'>5</h5>
                <p className='mb-0 text-info'>Active Contacts</p>
                <Divider className='my-2 mb-0' />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
