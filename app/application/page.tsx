"use client";

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@radix-ui/react-accordion";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";


import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"




export default function ApplicationPage() {

    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ]

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig


    return (

        <>

            <div className="w-svw h-auto flex justify-start items-start bg-gray-50 ">
                <div className="w-1/4 h-auto border border-black bg-gray-100 mx-4 my-4 rounded p-4">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Tenders Management</AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full h-40 bg-purple-500"></div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Project Management</AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full h-40 bg-purple-500"></div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Users Management</AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full h-40 bg-purple-500"></div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Portfolio Management</AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full h-40 bg-purple-500"></div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="w-2/3 h-screen bg-gray-100 border border-black rounded mt-4 mr-4 mb-4 p-4 flex flex-col">
                    <div className=" h-auto flex justify-center">
                        <div className="w-1/6 h-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                        </div>
                        <div className="w-1/6 h-auto mx-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                        </div>
                        <div className="w-1/6 h-auto mx-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                        </div>
                        <div className="w-1/6 h-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Card Title</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>

                        </div>
                    </div>
                    <div className="w-full h-auto flex justify-center items-center">
                        <div className="w-4/5 mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Bar Chart - Multiple</CardTitle>
                                    <CardDescription>January - June 2024</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer config={chartConfig}>
                                        <BarChart accessibilityLayer data={chartData}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                tickMargin={10}
                                                axisLine={false}
                                                tickFormatter={(value) => value.slice(0, 3)}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent indicator="dashed" />}
                                            />
                                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                                <CardFooter className="flex-col items-start gap-2 text-sm">
                                    <div className="flex gap-2 font-medium leading-none">
                                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                                    </div>
                                    <div className="leading-none text-muted-foreground">
                                        Showing total visitors for the last 6 months
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                </div>

            </div>



        </>

    );

}