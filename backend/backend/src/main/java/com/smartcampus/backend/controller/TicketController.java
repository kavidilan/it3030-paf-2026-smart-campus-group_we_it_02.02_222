package com.smartcampus.backend.controller;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartcampus.backend.dto.UpdateTicketRequest;
import com.smartcampus.backend.model.Ticket;
import com.smartcampus.backend.repository.TicketRepository;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @PostMapping("")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        // basic validation
        if (ticket.getResourceId() == null || ticket.getResourceId().isBlank())
            return ResponseEntity.badRequest().build();
        if (ticket.getUserId() == null || ticket.getUserId().isBlank())
            return ResponseEntity.badRequest().build();
        if (ticket.getDescription() == null || ticket.getDescription().isBlank())
            return ResponseEntity.badRequest().build();

        Instant now = Instant.now();
        ticket.setCreatedAt(now);
        ticket.setUpdatedAt(now);
        ticket.setStatus(ticket.getStatus() == null ? "OPEN" : ticket.getStatus());

        Ticket saved = ticketRepository.save(ticket);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("")
    public ResponseEntity<List<Ticket>> listTickets(@RequestParam(required = false) String userId,
            @RequestParam(required = false) String assignedTo, @RequestParam(required = false) String status) {
        if (userId != null && !userId.isBlank()) {
            return ResponseEntity.ok(ticketRepository.findByUserId(userId));
        }
        if (assignedTo != null && !assignedTo.isBlank()) {
            return ResponseEntity.ok(ticketRepository.findByAssignedTo(assignedTo));
        }
        if (status != null && !status.isBlank()) {
            return ResponseEntity.ok(ticketRepository.findByStatus(status));
        }

        return ResponseEntity.ok(ticketRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicket(@PathVariable String id) {
        return ticketRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable String id, @RequestBody UpdateTicketRequest request) {
        return ticketRepository.findById(id).map(existing -> {
            if (request.getStatus() != null && !request.getStatus().isBlank()) {
                existing.setStatus(request.getStatus());
            }
            if (request.getResolutionNotes() != null) {
                existing.setResolutionNotes(request.getResolutionNotes());
            }
            if (request.getAssignedTo() != null) {
                existing.setAssignedTo(request.getAssignedTo());
            }
            if (request.getImages() != null) {
                existing.setImages(request.getImages());
            }
            existing.setUpdatedAt(Instant.now());
            return ResponseEntity.ok(ticketRepository.save(existing));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<Ticket> assignTicket(@PathVariable String id, @RequestBody UpdateTicketRequest request) {
        return ticketRepository.findById(id).map(existing -> {
            if (request.getAssignedTo() != null && !request.getAssignedTo().isBlank()) {
                existing.setAssignedTo(request.getAssignedTo());
            }
            if (request.getStatus() != null && !request.getStatus().isBlank()) {
                existing.setStatus(request.getStatus());
            } else if (existing.getStatus() != null && existing.getStatus().equals("OPEN")) {
                existing.setStatus("IN_PROGRESS");
            }
            existing.setUpdatedAt(Instant.now());
            return ResponseEntity.ok(ticketRepository.save(existing));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
