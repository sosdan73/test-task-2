# Vue/React (просьба делать регулярно commit (или merge) в master)

Дедлайн: 09/06/2020 23:59:59 

Все вопросы, возражения, уточнения нужно создавать в [Issues](https://github.com/Themex/test2/issues).

Имеется абстрактная CRM клиента. Клиент создает заявку и подзаявку на поставку чайников Bosch или Polaris по конкретному региону РФ. Данные из пользовательского интерфейса отправляются по API в абстрактный бекенд. 

Необходимо создать GUI, реализующий следующие задачи:

1. Создание заявки на поставку крупной партии чайников
2. Создание подзаявки на поставку некоторого кол-ва приборов от крупной партии, так как она поставляется в несколько итераций по частям.
3. Подтверждение получения заказчиком чайников поставленных по подзаявке.
4. Отклонение получения подзаявки: некорректное число поставленных чайников, бракованные чайники, не те чайники.
5. Запрос информации по конкретной подзаявке или заявке.
6. Аутентификация и авторизация с использованием JWT-токенов.

Реализовывать решение можно с использованием любых библиотек из NPM.

# API

В случае успешного запроса возвращается HTTP код 200, иначе другой HTTP-код ошибки в соответствии с ее типом. (по классике)

## 1. Создание заявки на крупную поставку чайников
Запрос:
```json
{
  "app_code": "215115151-randomtext",
  "app_count": 5000,
  "app_price": 50000
}
```
Ответ:
```json
{
  "app_code": "215115151-randomtext",
  "app_count": 5000,
  "app_remained_count": 5000,
  "app_price": 50000,
  "app_paid": 0,
  "status": 0
}
```

Статусы (status):
* 0 - заявка в работе
* 1 - заявка закрыта, но не оплачена
* 2 - заявка закрыта и оплачена

Менеджер должен иметь возможность менять выплаченные суммы вручную.
Заявка закрывается (принимает статус 1 или 2) в случае достижения app_remained_count значения 0.

## 2. Подзаявка на поставку чайников
Запрос:
```json
{
  "sub_code": "01042020-15",
  "region": 77,
  "type": 1,
  "address": "Москва, Красная площадь, д.1",
  "app_code": "35",
  "sub_count": 350
}
```
Тип чайников (type):
1. Bosch
2. Polaris

Ответ:
```json
{
  "id": 1,
  "sub_code": "01042020-15",
  "app_code": "35",
  "status": 0,
  "reason": null
}
```
Статус (status):
* 0 - получено в обработку
* 1 - принято в работу 
* 2 - отправлено
* 3 - доставлено
* 4 - отклонено

Вид причины (reason) обычно текст указанный заказчиком. Не равняется null только при статусе 4.

## 3. Подтверждение получения заказчиком чайников поставленных по подзаявке.
## 4. Отклонение получения подзаявки: некорректное число поставленных чайников, бракованные чайники, не те чайники.

Запрос:
```json
{
  "sub_code": "01042020-15",
  "status": 0,
  "reason": null
}
```
Статусы (status):
* 0 - партия получена
* 1 - партия отклонена

В случае стаутса = 1, reason становится не равным null, указывается причина текстом.


Ответ:
```json
{
  "id": 1,
  "sub_code": "01042020-15",
  "app_code": "35",
  "status": 3,
  "reason": null
}
```

## 6. Аутентификация и авторизация с использованием JWT-токенов.

Здесь можно выполнять в свободном режиме и удобным способом.