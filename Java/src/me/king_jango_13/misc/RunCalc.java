package me.king_jango_13.misc;

public class RunCalc {
    public static void main(String[] args) {
        System.out.println("Test");
        try {
            Runtime.getRuntime().exec("calc");
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
