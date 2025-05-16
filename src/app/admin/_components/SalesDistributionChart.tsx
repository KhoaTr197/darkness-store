"use client";

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type DataPoint = {
  label: string;
  value: number;
};

interface SalesDistributionChartProps {
  data: DataPoint[];
  height?: number;
  width?: number;
  donut?: boolean;
}

const SalesDistributionChart = ({ 
  data, 
  height = 300, 
  width = 0,
  donut = true 
}: SalesDistributionChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    // Get the actual width from the container if not explicitly provided
    const actualWidth = width || containerRef.current.getBoundingClientRect().width;
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove();

    const radius = Math.min(actualWidth, height) / 2.5;

    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', actualWidth)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${actualWidth / 2}, ${height / 2})`);

    // Set up colors
    const color = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(d3.schemeTableau10);

    // Compute the position of each slice in the pie
    const pie = d3.pie<DataPoint>()
      .sort(null)
      .value(d => d.value);

    const arcs = pie(data);

    // Generate the arcs
    const arc = d3.arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(donut ? radius * 0.6 : 0)
      .outerRadius(radius);

    // Generate the hover arc (slightly larger)
    const hoverArc = d3.arc<d3.PieArcDatum<DataPoint>>()
      .innerRadius(donut ? radius * 0.6 : 0)
      .outerRadius(radius * 1.1);

    // Create slices
    const slices = svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', d => arc(d as d3.PieArcDatum<DataPoint>) as string)
      .attr('fill', d => color((d as d3.PieArcDatum<DataPoint>).data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
      .style('transition', 'all 0.3s');

    // Calculate the total value
    const total = d3.sum(data, d => d.value);

    // Create a tooltip
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

    // Add hover effects
    slices
      .on('mouseover', function(this: any, event: any, d: any) {
        const datum = d as d3.PieArcDatum<DataPoint>;
        d3.select(this)
          .attr('d', () => hoverArc(datum) as string)
          .style('opacity', 1);
        
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        
        const percentage = ((datum.data.value / total) * 100).toFixed(1);
        
        tooltip.html(`<strong>${datum.data.label}</strong><br>$${datum.data.value.toLocaleString()}<br>${percentage}%`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', function(this: any, event: any, d: any) {
        const datum = d as d3.PieArcDatum<DataPoint>;
        d3.select(this)
          .attr('d', () => arc(datum) as string)
          .style('opacity', 0.7);
        
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add center text for donut chart
    if (donut) {
      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('font-size', '1.5rem')
        .style('font-weight', 'bold')
        .style('fill', '#333')
        .text(`$${total.toLocaleString()}`);
      
      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.5em')
        .style('font-size', '0.8rem')
        .style('fill', '#666')
        .text('Total Sales');
    }

    // Create legend
    const legendRectSize = 15;
    const legendSpacing = 4;
    const legendHeight = legendRectSize + legendSpacing;

    const legend = svg.selectAll('.legend')
      .data(arcs)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {
        // Calculate the position of each legend item
        // Start from the top right and position downwards
        const offset = radius + 10;
        const horz = offset;
        const vert = i * legendHeight - radius + 100;
        return `translate(${horz},${vert})`;
      });

    // Draw colored rectangles for the legend
    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', d => color(d.data.label))
      .style('stroke', d => color(d.data.label));

    // Add text labels to the legend
    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(d => {
        // Truncate long labels
        const label = d.data.label;
        return label.length > 15 ? label.substring(0, 15) + '...' : label;
      })
      .style('font-size', '12px');

    // Add a title
    svg.append('text')
      .attr('x', 0)
      .attr('y', -height / 2 + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Sales Distribution by Category');

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.getBoundingClientRect().width;
        if (newWidth !== actualWidth) {
          svg.remove();
          tooltip.remove();
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      tooltip.remove();
    };
  }, [data, height, width, donut]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  );
};

export default SalesDistributionChart; 