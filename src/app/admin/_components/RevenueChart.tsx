"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type DataPoint = {
  date: Date;
  value: number;
};

interface RevenueChartProps {
  data: DataPoint[];
  height?: number;
  width?: number;
}

const RevenueChart = ({ data, height = 300, width = 0 }: RevenueChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    // Get the actual width from the container if not explicitly provided
    const actualWidth = width || containerRef.current.getBoundingClientRect().width;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Set up margins and dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
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
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([innerHeight, 0]);

    // Create axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat('%b %Y') as any);

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => `$${d3.format('.0f')(d)}`);

    // Add the axes to the chart
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Create a line generator
    const line = d3.line<DataPoint>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add the line path to the chart
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#4F46E5')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add gradient fill under the line
    const defs = svg.append('defs');
    
    const gradient = defs.append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#4F46E5')
      .attr('stop-opacity', 0.3);
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#4F46E5')
      .attr('stop-opacity', 0.05);

    // Create an area generator
    const area = d3.area<DataPoint>()
      .x(d => xScale(d.date))
      .y0(innerHeight)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Add the area path to the chart
    g.append('path')
      .datum(data)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', area);

    // Add dots for each data point
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.value))
      .attr('r', 4)
      .attr('fill', '#4F46E5')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

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

    g.selectAll('.dot')
      .on('mouseover', function(this: any, event: any, d: any) {
        const datum = d as DataPoint;
        d3.select(this)
          .attr('r', 6)
          .attr('stroke', '#4F46E5');

        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
          
        tooltip.html(`<strong>${d3.timeFormat('%b %d, %Y')(datum.date)}</strong><br/>Revenue: $${d3.format(',')(datum.value)}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', function () {
        d3.select(this)
          .attr('r', 4)
          .attr('stroke', '#fff');

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
      .text('Revenue Over Time');

    // Add x-axis label
    g.append('text')
      .attr('class', 'x-axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom - 5)
      .style('font-size', '12px')
      .text('Date');

    // Add y-axis label
    g.append('text')
      .attr('class', 'y-axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${-margin.left + 15},${innerHeight / 2}) rotate(-90)`)
      .style('font-size', '12px')
      .text('Revenue (USD)');
      
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

export default RevenueChart; 