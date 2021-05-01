# awscii-cli [/ˈɔːskiː/](http://ipa-reader.xyz/?text=%CB%88%C9%94%CB%90ski%CB%90)

CLI tool that lets you render predefined AWS graphs in ASCII art using [asciichart](https://www.npmjs.com/package/asciichart).

The purpose of this tool is to give cloud engineers instant access to their resources' graphs without context switching into the AWS console. The graph definitions are taken from respective service's monitoring tab in the console.

The tool also provides a quick way to find resources using autocomplete and partial search. Each supported service provides a link to the more detailed view in the AWS console for more granular inspection than what ASCII-art offers.

## Supported AWS services

Version 1.0.x supports the following subset of AWS services:
* Lambda
* DynamoDB
* API Gateway

## Usage
```
Usage: awscii [options] [command]

Options:
  -v, --version             output the current version
  -h, --help                display help for command

Commands:
  lambda|l [options]        Browses and visualises Lambda metrics as ASCII diagrams
  dynamodb|ddb [options]    Browses and visualises DynamoDB metrics as ASCII diagrams
  apigateway|api [options]  Browses and visualises API Gateway V1 metrics as ASCII diagrams
  help [command]            display help for command
```
![Demo](https://raw.githubusercontent.com/mhlabs/awscii-cli/main/images/demo.gif)

## Using `awscii` as a live dashboard
You can use `awscii` together with the [watch](https://linuxize.com/post/linux-watch-command/) command to create live dashboards for your office screens:

`watch -n60 --color awscii lambda --name my-function-name --graph-types Errors,Invocations --profile default`

![Demo](https://raw.githubusercontent.com/mhlabs/awscii-cli/main/images/demo2.gif)