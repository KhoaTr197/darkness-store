"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type DataPoint = {
  label: string;
  value: number;
};

interface OrdersChartProps {
  data: DataPoint[];
  height?: number;
  width?: number;
}

const OrdersChart = ({ data, height = 300, width = 0 }: OrdersChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    // Get the actual width from the container if not explicitly provided
    const actualWidth = width || containerRef.current.getBoundingClientRect().width;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up margins and dimensions
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const innerWidth = actualWidth - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', actualWidth)
      .attr('height', height);

    // Create container group for the chart, applying margins
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([innerHeight, 0]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    // Add the axes to the chart
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em');

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Create a color scale
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    // Add the bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label) as number)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.value))
      .attr('fill', d => colorScale(d.label))
      .attr('rx', 4) // Rounded corners
      .attr('ry', 4);

    // Add value labels on top of bars
    g.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .attr('x', d => (xScale(d.label) as number) + xScale.bandwidth() / 2)
      .attr('y', d => yScale(d.value) - 5)
      .text(d => d.value)
      .style('font-size', '12px')
      .style('font-weight', 'bold');

    // Add hover effects
    const tooltip = d3.select(containerRef.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', '#333')
      .style('color', '#fff')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('z-index', '100');

    g.selectAll('.bar')
      .on('mouseover', function(this: any, event: any, d: any) {
        const datum = d as DataPoint;
        d3.select(this)
          .attr('opacity', 0.8);

        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
          
        tooltip.html(`<strong>${datum.label}</strong><br/>Orders: ${datum.value}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', function () {
        d3.select(this)
          .attr('opacity', 1);

        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add a title
    svg.append('text')
      .attr('x', actualWidth / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Orders by Category');

    // Add x-axis label
    g.append('text')
      .attr('class', 'x-axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom - 5)
      .style('font-size', '12px')
      .text('Product Category');

    // Add y-axis label
    g.append('text')
      .attr('class', 'y-axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left + 15},${innerHeight / 2}) rotate(-90)`)
      .style('font-size', '12px')
      .text('Number of Orders');
      
    // Add event listener for resize
    const handleResize = () => {
      // Re-render the chart when window is resized
      if (containerRef.current) {
        const newWidth = containerRef.current.getBoundingClientRect().width;
        if (newWidth !== actualWidth) {
          // Only re-render if width has changed
          svg.remove();
          tooltip.remove();
          // The chart will be redrawn on the next render
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tooltip.remove();
    };
  }, [data, height, width]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  );
};

export default OrdersChart; 