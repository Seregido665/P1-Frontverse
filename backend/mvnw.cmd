@echo off
setlocal

SET WRAPPER_JAR="%~dp0.mvn\wrapper\maven-wrapper.jar"
SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

IF NOT EXIST %WRAPPER_JAR% (
    echo Descargando Maven Wrapper por primera vez...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', '%~dp0.mvn\wrapper\maven-wrapper.jar')"
    IF ERRORLEVEL 1 (
        echo Error al descargar Maven Wrapper. Comprueba tu conexion a internet.
        EXIT /B 1
    )
)

java -Dmaven.multiModuleProjectDirectory="%~dp0" -classpath %WRAPPER_JAR% %WRAPPER_LAUNCHER% %*

endlocal
