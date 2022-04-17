import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, BulbOutlined, FundOutlined } from "@ant-design/icons";
import icon from "../images/crypto2.png";

function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} />
        <Typography.Title level={0} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrenciesPage">Cryptocurrencies</Link>
        </Menu.Item>

        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/newsPage">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
export default Navbar;
