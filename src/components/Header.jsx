import logo from "../assets/images/chef-claude-icon.png"

export default function Header() {
    return (
        <>
        <header>
            <img src={logo} alt="chef-claude-logo" />
            <h1>Chef Claude</h1>
        </header>
        </>
    );
}