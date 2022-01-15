package me.king_jango_13.misc;

public class RunCalc {
    public static void main(String[] args) {
        try {
            Runtime.getRuntime().exec("calc");
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
