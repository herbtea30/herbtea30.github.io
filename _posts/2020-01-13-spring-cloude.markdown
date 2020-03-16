---
layout: post
title:  "Spring Cloud - Neflix OSS "
description: Spring Cloud with 넷플릭스 OSS
date:   2020-01-13 12:20:00 00000
categories: spring msa netflix eureka circuitbreak cloud springboot 
---

![SpringCloude](https://dotnetvibes.files.wordpress.com/2019/05/netflix-oss-framework.png?w=700)
사내에서 MSA도입을 준비하고 있지 않지만, 향후 MSA로 전환은 피할수 없을 것 같아서,
기존 인프라를 MSA로 전환할때 어떻게 해야하나 선행 스터디를 하고 있다.


SpringCloud에 Netflix 오픈소스를 사용해서 서비스하는 여러 사례들을 보고,
한번 해보고자 해서 스터디를 하고 있는데, 정말 편리하고 좋다는 생각이 하면 할 수록 든다.

이 스터디를 통해서, 현재 내부에서 서비스 중인 프로그램등 중에 몇가지 MSA로 구성할까 하는 생각중이다.
부하가 많이 걸리고, 분산이 필요한 서비스를 MSA로 전환하여 서비스를 하면 좋겠다라는 생각이 든다.

## Monolithic Architecture VS MSA
---
![maVSmsa](https://martinfowler.com/articles/microservices/images/sketch.png)

---

## SpringCloud
---
![SpringCloud](https://camo.githubusercontent.com/494e6becba072436a4cdb80b67751a380bdfc307/68747470733a2f2f626c6f672e636f646563656e747269632e64652f66696c65732f323031372f30352f6d756c7469706c652d617070732d737072696e672d626f6f742d636c6f75642d6e6574666c69782d373638783534332e706e67)
Spring Cloud는 분산 시스템에서 공통적인 부분(구성, 서비스검색, 라우팅, 프록시 등)을 도와준다.
그리고 마이크로 서비스의 개수가 늘어나게 되면 관리가 어렵게 되고, 이를 해결하기위하 사용한다.

개발자가 분산시스템 구현에 필요한 부분의 대한 부담을 덜고, 각 서비스의 기능에 충실할 수 있도록
라이브러리의 형태로 제공한다.

---

## Netflix OSS
Netflix는 전 세계에서 MSA를 가장 잘 적용한 서비스 중 하나이며, Java기반으로 
오픈소스로 공개되었다. 적용해야할 서비스를 찾아봐야겠다.

<br>
## 1. Zuul
---
![Zuul](https://camo.githubusercontent.com/5e596c573110bffb608614a09c97611107205d0d/687474703a2f2f6e6574666c69782e6769746875622e696f2f7a75756c2f696d616765732f7a75756c2d706879736963616c2d617263682e706e67)
API-Gateway 
모든 클라이언트의 요청에 대한 End-point를 통합하는 서버
<br>

## 2. Eureka
---
![Eureka](https://t1.daumcdn.net/cfile/tistory/99D5AA3F5C5C265933)
Client Side Service Discovery

## 3. Hystrix
---
![Hystrix](https://github.com/Netflix/Hystrix/wiki/images/hystrix-command-flow-chart-640.png)<br>
Circuit Breaker

## 4. Ribbon
---
![Ribbon](https://lh5.googleusercontent.com/proxy/aeC8QSnthfXTQZfX19ImpPWyNCejrc9dBMcaHZy5u_ybz4cmtwY3_Sd0W05EU5sfAzfwNzn1h-is6K2BLRghMTgLGPnoJxSF7H-LC866gEn7gm_nZ4RpkL3UrVMQZO4a35HvJBuM9-TAFyi87g=s0-d)
Client Side Load Balancing

---

스터디하면서, 적용여부 검토해봐야겠다.<br>
