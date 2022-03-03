package me.kingjango13.misc;

import java.io.*;
import java.net.*;
import java.util.stream.*;

public class WebHelper {
    public static Stream<String> getURLData(String url) throws MalformedURLException, IOException {
        URL url1 = new URL(url);
        URLConnection connection = url1.openConnection();
        BufferedReader buffReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        return buffReader.lines();
    }
    public static Stream<String> getURLDataNoErr(String url){
        try {
            return getURLData(url);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
