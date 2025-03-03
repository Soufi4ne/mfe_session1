/**
 * Configuration Webpack pour le micro-frontend de Fiche Produit (Product Details)
 *
 * Ce fichier configure un micro-frontend qui sera consommé par l'application Shell.
 * Il expose un composant ProductDetails qui pourra être importé dynamiquement.
 */

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { dependencies } = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:3002/", // URL publique de base pour les assets (port unique)
  },
  devServer: {
    port: 3002, // Port du serveur de développement (unique pour chaque MFE)
    static: {
      directory: path.join(__dirname, "public"),
    },
    headers: {
      // Configuration des en-têtes CORS (Cross-Origin Resource Sharing)
      "Access-Control-Allow-Origin": "*", // Autoriser toutes les origines (pour le développement)
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "productDetails", // Nom UNIQUE du Micro Frontend
      filename: "remoteEntry.js", // Nom du fichier d'entrée exposé
      remotes: {
        shell: "shell@http://localhost:3000/remoteEntry.js",
      },
      exposes: {
        "./ProductDetails": "./src/ProductDetails", // Expose le composant ProductDetails
      },
      shared: {
        // Configuration des dépendances partagées
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
}; 