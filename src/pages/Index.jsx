import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Grid, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import { FaFolder, FaFile, FaPlus, FaUpload } from "react-icons/fa";

const Index = () => {
  const [files, setFiles] = useState([
    { id: 1, name: "Document 1.docx", type: "file" },
    { id: 2, name: "Folder 1", type: "folder" },
    { id: 3, name: "Image 1.jpg", type: "file" },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileUpload = () => {
    // Simulating file upload
    const newFile = {
      id: files.length + 1,
      name: `New File ${files.length + 1}`,
      type: "file",
    };
    setFiles([...files, newFile]);
  };

  const handleFolderCreate = () => {
    // Simulating folder creation
    const newFolder = {
      id: files.length + 1,
      name: `New Folder ${files.length + 1}`,
      type: "folder",
    };
    setFiles([...files, newFolder]);
  };

  const openFile = (file) => {
    setSelectedFile(file);
    onOpen();
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        My Drive
      </Heading>
      <Box mb={8}>
        <Input placeholder="Search files..." size="lg" />
      </Box>
      <Box mb={8}>
        <Button leftIcon={<FaPlus />} colorScheme="blue" mr={4} onClick={handleFolderCreate}>
          New Folder
        </Button>
        <Button leftIcon={<FaUpload />} colorScheme="green" onClick={handleFileUpload}>
          Upload File
        </Button>
      </Box>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={8}>
        {files.map((file) => (
          <Box key={file.id} borderWidth={1} borderRadius="lg" p={4} textAlign="center" cursor="pointer" onClick={() => openFile(file)}>
            {file.type === "folder" ? <FaFolder size={48} /> : <FaFile size={48} />}
            <Text mt={2}>{file.name}</Text>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedFile?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedFile?.type === "file" && <Image src="https://images.unsplash.com/photo-1644361566696-3d442b5b482a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmaWxlJTIwcHJldmlld3xlbnwwfHx8fDE3MTAwNjY0OTh8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="File Preview" />}
            <Text>File Details</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
