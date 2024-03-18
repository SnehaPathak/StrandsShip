import React from "react";
import { Image, Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { Surface } from "react-native-paper";
import { images } from "../assets";

import { IArticle } from "../types/Models/IArticle";
import { Colors } from "../styles/Index";
import WebView from "react-native-webview";
import RenderHTML from "react-native-render-html";

const Article = (article: IArticle) => {

    const htmlContent = `
    <h1>Welcome to my React Native App!</h1>
    <p>This is an example of rendering HTML using <strong>react-native-render-html</strong> library.</p>
    <p>Here's a link to Scaler Topics <a href="https://www.scaler.com/topics/">Home page</a></p>
    <p><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</em></p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  `;

    let contentWidth = useWindowDimensions().width - 100;
    let content;
    let titleContent: any;
    let subTitleContent: any;
    let imgContent: any;

    if (article.title) {
        console.log(`title is ${article.title}`);
        titleContent = (
            <Text style={ArticleStyles.ArticleTitle}>{article.title}</Text>
        )
    }

    if (article.subtitle) {
        console.log(`subtitle is ${article.subtitle}`);
        subTitleContent = (
            <Text style={ArticleStyles.ArticleSubTitle}>{article.subtitle}</Text>
        )
    }

    if (article.imageUrl) {
        imgContent = (
            <Surface style={ArticleStyles.ArticleImageContainer} elevation={3}>
                <Image style={ArticleStyles.ArticleImage} source={{ uri: article.imageUrl }}></Image>
            </Surface>)
    }

    content = (
        <View style={ArticleStyles.ArticleContainer}>
            {titleContent}
            {subTitleContent}
            {imgContent}
            <Text style={ArticleStyles.ArticleText}>{article.content}</Text>
            {/* <Text>{htmlContent}</Text> */}
            <WebView style={{ flex: 1, fontSize: 50, width: contentWidth }} originWhitelist={['*']} source={{ html: htmlContent }}></WebView>
            <RenderHTML contentWidth={contentWidth} source={{ html: htmlContent }} />
        </View>
    );

    return content;
}

export default Article;

const ArticleStyles = StyleSheet.create({
    ArticleContainer: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10
    },
    ArticleImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    ArticleImage:
    {
        height: 200,
        width: "80%",
        borderColor: 'black',
        resizeMode: "cover",
        objectFit: "contain"
    },
    ArticleText:
    {
        fontSize: 17,
        paddingTop: 10,
        color: Colors.PRIMARY_BLACK
    },
    ArticleTitle:
    {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 15,
        alignSelf: 'center',
        color: Colors.PRIMARY_BLACK
    },
    ArticleSubTitle:
    {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center',
        color: Colors.SECONDARY_BLACK
    }
});