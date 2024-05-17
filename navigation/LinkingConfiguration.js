/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Tabs: {
        screens: {
          Farm: {
            screens: {
              HomeScreen: "Home",
            },
          },

          Account: {
            screens: {
              Notify: "Notify",
              HowWeSource: "HowWeSource",
            },
          },
        },
      },

      Modal: {
        screens: {
          NotifyMe: "NotifyMe",
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
