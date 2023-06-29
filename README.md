# node-chart-lambda-image

AWS lambda image to generate different charts using node-canvas and chart.js

Read the article on [Medium](https://mithundotdas.medium.com/deploy-chartjs-node-canvas-to-aws-lambda-using-docker-container-b903d0018e26)

Do you need to create line chart or bar chart from your lambda? This lambda docker image is at your service.

There are many use-cases where you need to generate graphs in your email content or slack message. This is different from rendeing graphs on the browser. Using this image you can create your lambda function which will generate the graph and return you the base64 encoded string.

## Supported charts

### Line chart

![linechart](https://github.com/just4give/chartjs-node-canvas-lambda/assets/9275193/81546b10-7767-4154-a544-19e6114875db)

Input to the lambda

```json
{
  "type": "line",
  "labels": ["2017", "2018", "2019"],
  "data": [
    { "label": "Bears", "data": [90, 60, 120] },
    { "label": "Dolphins", "data": [60, 80, 100] },
    { "label": "Whales", "data": [70, 90, 100] }
  ],
  "title": "Wildlife Population"
}
```

### Bar chart

![alt](https://github.com/just4give/chartjs-node-canvas-lambda/assets/9275193/52a16b02-3021-4851-98a6-b542d7b5d3b8)

```json
{
  "type": "bar",
  "labels": ["2017", "2018", "2019"],
  "data": [
    {
      "label": "Count",
       "data": [90, 60, 120]
    }
  ],
  "title": "Bear counts by year"
}
```

## Lambda Runtime and Architecture

This lambda supports

- Node 16.x
- Node 18.x

This is built on arm 64 bit as it's better than x86 64 bits both in terms of cost and performance. For more read this [article](https://docs.aws.amazon.com/lambda/latest/dg/foundation-arch.html)

## Build and Test locally

As this a docker container, it's easy to run and test on your local computer. All you need to do is build the image, run the container.

```shell
make build ENVFILE=.env

```

Note docker tag in the console. Run the container

```shell
docker run --rm -p 8080:8080 node-chart:<tag>
```

Then invoke the lambda

```shell
aws lambda invoke --region us-east-1 --endpoint http://localhost:8080  --no-sign-request --function-name function --cli-binary-format raw-in-base64-out \
 --payload '{"type":"line","labels":["2017","2018","2019"],"data":[{"label":"Bears","data":[90,60,120]},{"label":"Dolphins","data":[60,80,100]},{"label":"Whales","data":[70,90,100]}],"title":"Wildlife Population"}' output.txt



```

## Publish to ECR

```shell
make publish ENVFILE=.env
```
