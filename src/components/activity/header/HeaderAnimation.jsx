import React, {useState, useRef, useEffect, useCallback, useMemo} from "react";
import useAppStore from "@/store/useAppStore";

const HeaderAnimation = ({children}) => {
	return <div className={`ani`}>{children}</div>;
};
export default HeaderAnimation;
