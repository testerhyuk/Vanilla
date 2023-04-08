package com.vanilla.vanilla_shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
public class MailService {
    @Autowired
    JavaMailSender emailsender;

    public static final String epw = createKey();

    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailsender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);
        message.setSubject("바닐라 쇼핑몰 회원가입 이메일 인증");

        String msgg = "";
        msgg += "<p> 안녕하세요</p>";
        msgg += "<p> 바닐라 쇼핑몰입니다</p>";
        msgg += "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        msgg += "CODE : <strong>";
        msgg += epw + "</strong><div><br/> ";
        msgg += "</div>";

        message.setText(msgg, "utf-8", "html");
        message.setFrom(new InternetAddress("testerhyuk@naver.com", "바닐라쇼핑몰"));

        return message;
    }

    // 랜덤 인증 코드 생성
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    break;
            }
        }

        return key.toString();
    }

    public void sendSimpleMessage(String to) throws Exception {
        MimeMessage message = createMessage(to);

        try {
            emailsender.send(message);
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalArgumentException();
        }
    }
}
