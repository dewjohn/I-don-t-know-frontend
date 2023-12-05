import React, { useState } from 'react';

const List = () => {
	const [list, setList] = useState([]);

	return (
		<>
			<button>add</button>
			<ul>
				{list.map((item, index) => (
					<li>{item}</li>
				))}
			</ul>
		</>
	);
};

export default List;
