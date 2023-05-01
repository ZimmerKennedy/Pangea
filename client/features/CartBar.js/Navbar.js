import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset, selectAuth } from "../auth/authSlice";
import { clearCartOnLogout, selectCart } from "../cart/cartSlice";
import { resetUsers } from "../users/usersSlice";
import { AdminNavbar } from "./AdminNavbar";
const Navbar = () => {
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);
	const { isAdmin, email } = useSelector(selectAuth);
	const cart = useSelector(selectCart);
	const dispatch = useDispatch();
	const cartQuantity = cart.length
		? cart.reduce((total, { quantity }) => total + quantity, 0)
		: 0;
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		dispatch(clearCartOnLogout());
		if(isAdmin){
			dispatch(resetUsers())
		}
	};

	return (
		<div className="navBarDiv">
			<Link to="/"><h1 className="logoTitle">Grace Shopper Store</h1></Link>
			
			<nav className="navBar">
				{" "}
				{isAdmin ? (
					<div>
						<AdminNavbar />
					</div>
				) : null}
			</nav>
			<nav >
				
					<div className="linksFrame">
						{/* The navbar will show these links after you log in */}
						
						<Link to="/">Home</Link>
						<Link to="/rents">rents</Link>
						<Link className="cartLink" to="/cart">Cart:{cartQuantity}</Link>
					</div>
				
					<div className="linksFrame">
						{/* The navbar will show these links before you log in */}
						
						
						<Link to="/rents">rents</Link>
						<Link className="cartLink" to="/cart">Cart:{cartQuantity}</Link>
						
					</div>
				
			</nav>
			
		</div>
	);
};

export default Navbar;
