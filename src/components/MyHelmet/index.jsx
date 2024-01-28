import {Helmet} from "react-helmet";
import React from "react";

export default function MyHelmet({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
    </Helmet>
  )
}