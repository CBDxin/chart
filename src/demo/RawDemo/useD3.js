import { useEffect } from "react";
import * as d3 from 'd3'

export default function(props) {
	useEffect(() => {
		let p = d3.select("body").append("p");
		p.text("Hello World");
  }, []);
}
