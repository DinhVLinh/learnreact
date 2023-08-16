import React from "react";
// import PropTypes from 'prop-types';
import MuList from "./components/MuList";

MuFeatures.propTypes = {};

function MuFeatures(props) {
  const muList = [
    {
      id: 1,
      name: "Marcus RashFord",
      imgUrl:
        "https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/351312368_145813925170190_998515909185791031_n.jpg?_nc_cat=109&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=CVQ6YsGXoeQAX8VM5Qn&_nc_ht=scontent.fhan5-9.fna&oh=00_AfAzy_UKpx2JXB9NYx_8mB4r2VfICKDak2WGYRPZGeQtmg&oe=64BB345A",
    },

    {
      id: 2,
      name: "Bruno Fernandes",
      imgUrl:
        "https://scontent.fhan5-1.fna.fbcdn.net/v/t39.30808-6/361573993_854122332740964_5276478029711393424_n.jpg?_nc_cat=1&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=THFTwIeutgcAX9RPRgL&_nc_ht=scontent.fhan5-1.fna&oh=00_AfCQtF5BUiSLE940kUxNnVRtV9nG4s5dVeixMeQZ02-cYw&oe=64BA4BDF",
    },

    {
      id: 3,
      name: "Mason Mount",
      imgUrl:
        "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/358466097_849347186551812_928706265200580457_n.jpg?_nc_cat=102&cb=99be929b-3346023f&ccb=1-7&_nc_sid=730e14&_nc_ohc=OjqjD28YCCEAX9dfMWb&_nc_ht=scontent.fhan5-2.fna&oh=00_AfAJObqxvU5od5_ZI9o5zssOwOM6v3jgByWMXrmY5LqnOg&oe=64BB9797",
    },
  ];
  return (
    <div>
      <h3>Mu List</h3>
      <MuList muList={muList} />
    </div>
  );
}

export default MuFeatures;
