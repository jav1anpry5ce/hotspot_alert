import React from "react";
import { Copy, CopyText } from "./Elements";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

export default function Copyright() {
  return (
    <Copy>
      <CopyText>
        {<AiOutlineCopyrightCircle style={{ marginTop: 4, marginRight: 4 }} />}
        Copyright Hotspot Alert 2021
      </CopyText>
    </Copy>
  );
}
