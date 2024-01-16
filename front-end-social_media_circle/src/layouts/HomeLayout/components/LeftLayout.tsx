import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Box,
  UnorderedList,
  ListItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

const LogOut: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Box
        display={"flex"}
        position={"absolute"}
        zIndex={"999"}
        bottom={"80px"}
        cursor={"pointer"}
        onClick={handleLogout}
      >
        <TbLogout2 className="text-slate-300 text-3xl mr-1" />
        <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.200"}>
          Logout
        </Text>
      </Box>
    </>
  );
};

export const LeftLayout: React.FC = () => {
  return (
    <Box
      width={"25%"}
      sx={{
        "@media screen and (max-width: 900px)": {
          display: "none",
        },
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        padding={"40px"}
        width={"25%"}
        height={"100vh"}
        position={"fixed"}
        zIndex="999"
      >
        <Heading
          as={"h1"}
          fontSize={"5xl"}
          color={"green.400"}
          marginLeft={"15px"}
        >
          Circle
        </Heading>
        <UnorderedList listStyleType={"none"}>
          <ListItem color={"gray.200"} fontSize={"lg"} className={"my-7"}>
            <FontAwesomeIcon icon={faHouse} className="mr-2" />
            <Link
              to={"/"}
              className={` ${location.pathname === "/" && "font-bold text-xl"}`}
            >
              Home
            </Link>
          </ListItem>
          <ListItem color={"gray.200"} fontSize={"lg"} className={"my-7"}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
            <Link
              to={"/search-user"}
              className={` ${
                location.pathname === "/search-user" && "font-bold text-xl"
              }`}
            >
              Search
            </Link>
          </ListItem>
          <ListItem color={"gray.200"} fontSize={"lg"} className={"my-7"}>
            <Link
              to={"/list-follow"}
              className={` ${
                location.pathname === "/list-follow" && "font-bold text-xl"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Follow
            </Link>
          </ListItem>
          <ListItem color={"gray.200"} fontSize={"lg"} className={"my-7"}>
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </ListItem>
          <ListItem>
            <Button size={"lg"} width={"100%"} rounded={"full"}>
              Created Post
            </Button>
          </ListItem>
        </UnorderedList>
        <LogOut />
      </Box>
    </Box>
  );
};
