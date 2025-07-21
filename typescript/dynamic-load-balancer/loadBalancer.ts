import consul from "consul";
import httpProxy from "http-proxy";
import { createServer } from "http";

const routing = [
  {
    path: "/api",
    service: "api-service",
    index: 0,
  },
  {
    path: "/",
    service: "webapp-service",
    index: 0,
  },
];
