import { redirect } from "react-router";

export function loader() {
	return redirect("/c/consultas");
}

export default function HomeRedirect() {
	return null;
}
