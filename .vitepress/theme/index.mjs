import DefaultTheme from "vitepress/theme";
import CustomLayout from "./CustomLayout.vue";
import "./style.css";

const { Layout } = DefaultTheme;

export default {
  Layout: CustomLayout
};
