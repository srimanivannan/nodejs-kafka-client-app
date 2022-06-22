### Keystore and Truststore understanding

Keystore will have keys(private and public) and certificates.
client will have to use the keys and certificates and send it to server to accept the content

Truststore is at client level, and it has certificates only.
client will use the truststore certificate to identify itself by server.

### How to export keys and certificates from JKS file (keystore and truststore)

### First you need a jks file: Keystore commands
1. you need jks file
2. then you need to find alias from jks file using command
   ```sh
    keytool -list -keystore yourCertificate.jks
   
    Result would be like this
   
    Enter keystore password:
    Keystore type: JKS
    Keystore provider: SUN
    
    Your keystore contains 1 entry
    
    [[[[[your alias name displayed here]]]]]], Sep 20, 2021, PrivateKeyEntry,
    Certificate fingerprint (SHA-256): B5:56:E5:E2:1A:19:42:30:D1:A9:BC:14:B0:DF:AB:6F:87:EC:09:41:4F:D0:D2:DA:B9:A5:3A:A4:FC:90:F7:25
    
    Warning:
    The JKS keystore uses a proprietary format. 
    It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore yourCertificate.jks -destkeystore yourCertificate.jks -deststoretype pkcs12".
    ```
3. now, export the certificate using below command
   ```sh
     keytool -exportcert -keystore yourCertificate.jks -file kafakacert.der -alias <<<your alias name that you got it from step 2 here>>>
    ```
4. convert der file to pem certificate file using below command
   ```sh
     openssl x509 -inform der -in kafakacert.der -out kafakacert.pem
    ```
5. extract keystore from jks file and convert to pkcs12 format
   ```shell
      keytool -importkeystore -srckeystore yourCertificate.jks -destkeystore yourCertificate.p12 -srcstoretype jks -deststoretype pkcs12
    ```
6. convert p12 keystore to pem file
   ```shell
    openssl pkcs12 -nodes -in yourCertificate.p12 -out kafkakeystore.pem
    ```

### if you have another jks file for truststore then, use below command: truststore command
1. you need to find alias from trust store jks file using command
   ```shell
      keytool -list -keystore yourTruststore.jks
    ```
2. now, export the trust store certificate using below command
   ```sh
     keytool -exportcert -keystore yourTruststore.jks -file kafakacerttrust.der -alias <<<your alias name that you got it from step 1 here>>>
    ```
3. convert der file to pem certificate file using below command
   ```sh
     openssl x509 -inform der -in kafakacerttrust.der -out kafakacerttrust.pem
    ```
4. use this certificate as ca certificate in kafkajs code where you create kafka object
